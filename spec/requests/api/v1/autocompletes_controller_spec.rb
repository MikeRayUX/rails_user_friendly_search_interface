require "rails_helper"
RSpec.describe "api/v1/autocompletes_controller", type: :request do
  before { 7.times { |num| create(:user) } }

  scenario "should get index" do
    get api_v1_autocompletes_path, params: {q: nil}

    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:code]).to eq(200)
    expect(json[:message]).to eq("success")
  end

  scenario "should get some users back with no query search param" do
    get api_v1_autocompletes_path, params: {q: nil}

    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:users].length).to eq 7
  end

  scenario "should get an exact match based on query string" do
    @match_name = "michael"
    User.create!(name: @match_name)

    get api_v1_autocompletes_path, params: {q: @match_name}

    json = JSON.parse(response.body).with_indifferent_access

    @matches = false

    json[:users].each { |user| @matches = true if user[:name] == @match_name }

    expect(@matches).to eq true
  end
end
