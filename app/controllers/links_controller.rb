class LinksController < ApplicationController
  before_action :find_link, only: [:edit, :update, :destroy]

  def index
    @tags = Tag.all
    if params[:id]
      @ojt_links = Tag.find(params[:id]).links.where(status: 'OJT')
      @s1_links = Tag.find(params[:id]).links.where(status: 'S1')
      @s2_links = Tag.find(params[:id]).links.where(status: 'S2')
    elsif params[:search]
      @ojt_links = Link.search_ojt(params[:search])
      @s1_links = Link.search_s1(params[:search])
      @s2_links = Link.search_s2(params[:search])
    else
      @ojt_links =  Link.where(status: 'OJT')
      @s1_links = Link.where(status: 'S1')
      @s2_links = Link.where(status: 'S2')
    end
    gon.index_key = ENV['LOCK_PASSWORD']
  end

  def new
    @link = Link.new
    @tags = Tag.all
  end

  def create
    @link = Link.new(link_params)
    if @link.tag_ids.length > 0 && @link.save
      # チェックされたタグをストロングパラメータで配列で受け取り、eachで回す
      @link.tag_ids.each do |t|
        unless TagLink.find_by(link_id: @link.id, tag_id: t.to_i)
          tag_link = TagLink.new(link_id: @link.id, tag_id: t.to_i)
          tag_link.save
        end
      end
      redirect_to links_path
    else
      @tags = Tag.all
      render :new
    end
  end

  def edit
    @tags = Tag.all
  end

  def update
    if @link.update(link_params)
      # tag_linksのtag_idは 1, 2, 3と仮定
      # tag_idsは 3, 4, 5と仮定
      tag_links = @link.tag_links # ["1", "2", "3"]
      # tag_linkを作成(新規でパラメータが送られてきたら)
      @link.tag_ids.each do |t| # ["3", "4", "5"]
        if !tag_links.find_by(link_id: @link.id, tag_id: t.to_i) # tが4, 5の時true
          tag_link = TagLink.new(link_id: @link.id, tag_id: t.to_i)
          tag_link.save
          @link.tag_ids.delete("#{t}")      
        end
      end
      # tag_linkを削除(既存のパラメータが送られてこなかったら)
      array = tag_links.pluck(:tag_id) - @link.tag_ids # ["1", "2"]
      array.each do |tl|
        TagLink.find_by(link_id: @link.id, tag_id: tl.to_i).destroy # tlが1, 2の時削除
      end
      if @link.status == "S2_ONLY"
        redirect_to blue_index_links_path
      else
        redirect_to links_path
      end
    else
      render :edit
    end
  end

  def destroy
    @link.destroy
  end

  def list
  end

  def blue_index
    @links = Link.where(status: "S2_ONLY")
    gon.index_key = ENV['LOCK_PASSWORD']
  end

  private

  def find_link
    @link = Link.find(params[:id])
  end

  def link_params
    # タグのidをtag_ids: []で配列で受け取る
    params.require(:link).permit(:title, :url, :status, tag_ids: [])
  end

end
