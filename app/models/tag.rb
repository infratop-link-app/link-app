class Tag < ApplicationRecord
  has_many :tag_links
  has_many :links, through: :tag_links

  validates :name, presence: true
end
