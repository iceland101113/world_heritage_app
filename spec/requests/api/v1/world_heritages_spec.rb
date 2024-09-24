require 'swagger_helper'

RSpec.describe 'api/v1/world_heritages', type: :request do

  path '/api/v1/world_heritages' do

    get('list world_heritages') do
      response(200, 'successful') do
        let!(:world_heritage) { create(:world_heritage) }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/v1/world_heritages/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show world_heritage') do
      response(200, 'successful') do
        let!(:world_heritage) { create(:world_heritage, id: 1) }
        let(:id) { 1 }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
