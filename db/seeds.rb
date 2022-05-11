100.times { |num| User.create(name: Faker::Name.first_name) }

p "#{User.count} users created!"
