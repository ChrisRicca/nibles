require 'rubygems'
require 'sinatra'
require 'dropio'
require 'erb'
require 'digest/sha1'

configure :production do
  Dropio.api_key = "3c9f26eb4cac5c03223d7f96b2286b68297c8686"
end

configure :development do
  Dropio.api_key = "f4a700e04c1ce4d3d3087a3fdc576c176b6550a3"
end

get '/' do
  @drop = Dropio::Drop.create()
  @drop.name
end

get '/:dropname/iframe' do
  @dropname = params[:dropname]
  erb :iframe
end