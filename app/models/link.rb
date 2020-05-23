class Link < ApplicationRecord
    has_many :tag_links
    has_many :tags, through: :tag_links


    validates :title, presence: true
    validates :url, presence: true
    validates :status, presence: true

    enum status: { OJT: 0, S1: 1, S2: 2 }
end
