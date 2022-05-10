require "rails_helper"

RSpec.describe User, type: :model do
  it "should not" do
    @user = User.new(name: nil)
    expect(@user.save).to eq false
  end
end
