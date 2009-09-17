require 'rubygems'
require 'sinatra'
require 'dropio'
require 'erb'
require 'digest/sha1'

configure :production do
  HOSTNAME = "http://clipgrab.heroku.com/"
  Dropio.api_key = "3c9f26eb4cac5c03223d7f96b2286b68297c8686"
  JAVASCRIPT_API_KEY = "20bc18e305cc8c1cd943085d4ac53ce088968b11"
end

configure :development do
  HOSTNAME = "http://localhost:9393/"
  Dropio.api_key = "f4a700e04c1ce4d3d3087a3fdc576c176b6550a3"
  JAVASCRIPT_API_KEY = "1aca9fef21a9110c9f583c4ea8202ee23e5f8e94"
end

get '/' do
  @drop = Dropio::Drop.create()
  @drop.name
end

get '/:dropname/iframe' do
  @dropname = params[:dropname]
  erb :iframe
end