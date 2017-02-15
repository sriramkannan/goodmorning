var $ = require('jquery');
var validator = require('validator');

function validateDate(obj) {
	//$('.form-control#issues-date').val("sdfgdsgfdg");
	if(validator.isDate($(obj).val()) == false) {
		$(obj).css("background-color", "yellow");
	} else {
		$(obj).css("background-color", "white");
	}
}

function validateNotes(obj, noteObj) {
	//$('.form-control#notes1').css("background-color", "yellow");
	//$(".form-control#summary").val($(obj).val());
	if($(obj).val()!="Up") {
		if($(noteObj).val()=="") {
			$(noteObj).css("background-color", "yellow");
		} else {
			$(noteObj).css("background-color", "white");
		}
	} else {
		$(noteObj).css("background-color", "white");
	}
}

function validateAll() {
	if(validateEmailPass()) {
		var allOK = true;
		$('.form-control').each(function() {
			if($(this).css("background-color") == "rgb(255, 255, 0)") {
				alert("Please fix all highlighted fields");
				allOK = false;
				return;
			}
		});
		if(allOK) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function validateEmailPass() {
	if($('[type="email"]').val() == "" || $('[type="password"]').val() == "") {
		alert("Please enter Email and password");
		return false;
	} else {
		if(!validator.isEmail($('[type="email"]').val())) {
			alert("Please enter a valid email id");
			return false;
		} else {
			return true;
		}
	}
}

module.exports.validateAll = validateAll;