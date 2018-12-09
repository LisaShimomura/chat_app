# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
i = 10000
1.times do
  gimei = Gimei.new

  user = User.create(
    name: gimei.first.hiragana + gimei.last.romaji,
    email: i.to_s + "@Lisa.jp",
    password: "password",
    image: nil
  )
  user.save!
  i = i + 1

end
# 1万件のデモデータを作ってみる
