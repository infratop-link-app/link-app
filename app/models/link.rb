class Link < ApplicationRecord
    has_many :tag_links
    has_many :tags, through: :tag_links

    validates :title, presence: true
    validates :url, presence: true
    validates :status, presence: true

    enum status: { OJT: 0, S1: 1, S2: 2 }

    def self.search_ojt(search)
        if search
            ojt = self.where(status: 'OJT')
                ojt.where(['title LIKE ?', "%#{search}%"])
        else
            all
        end
    end
    def self.search_s1(search)
        if search
            s1 = self.where(status: 'S1')
                s1.where(['title LIKE ?', "%#{search}%"])
        else
            all
        end
    end
    def self.search_s2(search)
        if search
            s2 = self.where(status: 'S2')
                s2.where(['title LIKE ?', "%#{search}%"])
        else
            all
        end
    end
end
