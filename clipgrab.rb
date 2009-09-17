require 'rubygems'
require 'sinatra'
require 'erb'
require 'dropio'
require 'digest/sha1'

get '/' do
  "Hello World"
end