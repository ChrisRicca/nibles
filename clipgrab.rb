require 'rubygems'
require 'sinatra'
require 'dropio'
require 'erb'
require 'digest/sha1'


configure do
  DEPLOY_TIMESTAMP = Time.now.to_i
end

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
  "<form action='/' method='post'><input type='submit' value='Create a new Bin'/></form>"
end

post '/' do
  @drop = Dropio::Drop.create()
  redirect "/#{@drop.name}", 303
end

get '/iframe.html' do
  erb :iframe
end

get '/:dropname' do
  @dropname = params[:dropname]
  erb :get_bookmarklet
end

get '/:dropname/go_bookmarklet.js' do
  @dropname = params[:dropname]
  erb :bookmarklet_execute_script
end

helpers do
  def bookmarklet_script(dropname)
    erb :bookmarklet_loader_script, :locals => {:dropname => dropname}
  end
end