class Client < ApplicationRecord
  validates :title, :full_name, :tax_number, presence: true

end