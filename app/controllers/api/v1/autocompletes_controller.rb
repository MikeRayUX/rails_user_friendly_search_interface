class Api::V1::AutocompletesController < Api::ApiController
  # api_v1_autocompletes_path | /api/v1/autocompletes GET
  def index
    render json: {
      code: 200,
      message: "success",
      users: User.ransack(name_cont: params[:q]).result(distinct: true).limit(7).select(:id, :name)
    }
  end
end
