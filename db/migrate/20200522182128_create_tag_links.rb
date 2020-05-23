class CreateTagLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :tag_links do |t|
      t.integer :link_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
