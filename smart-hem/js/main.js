$(document).ready(function(){

$(".house-livingroom").click(function(){
	settings.currentPage = 'view-livingroom'; loadSettings(); });
$(".house-kitchen").click(function(){
	settings.currentPage = 'view-kitchen'; loadSettings(); });
$(".house-bedroom").click(function(){
	settings.currentPage = 'view-bedroom'; loadSettings(); });
$(".house-wc").click(function(){
	settings.currentPage = 'view-wc'; alert(settings.currentPage); loadSettings(); });
});