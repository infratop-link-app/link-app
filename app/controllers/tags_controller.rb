class TagsController < ApplicationController
  def new
    @tag = Tag.new
    @tags = Tag.all
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      redirect_to new_tag_path
    else
      @tags = Tag.all
      render :new
    end
  end

  def update 
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      redirect_to new_tag_path
    else
      @tags = Tag.all
      render :new
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    redirect_to new_tag_path
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
