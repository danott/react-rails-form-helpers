class Burger < ApplicationRecord
  has_and_belongs_to_many :toppings
  has_and_belongs_to_many :sauces
end
