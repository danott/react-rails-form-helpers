class Order < ApplicationRecord
  has_one :customer
  has_many :burgers

  accepts_nested_attributes_for :customer
  accepts_nested_attributes_for :burgers, allow_destroy: true
end
