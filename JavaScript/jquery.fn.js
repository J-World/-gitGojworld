$.ajaxSetup( {
	headers : {
		"X-Referer" : document.URL
	}
} );
$.fn.__tabs = $.fn.tabs;
$.fn.tabs = function ( a ,b ,c ,d ,e ,f ) {
	var base = location.href.replace( /#.*$/ ,'' );
	$( 'ul:first>li>a[href^="#"]' ,this ).each( function () {
		var href = $( this ).attr( 'href' );
		$( this ).attr( 'href' ,base + href );
	} );
	$( this ).__tabs( a ,b ,c ,d ,e ,f );
};
/**
 * selected 함수를 생성한다.(기존웹과동일)
 */
$.fn.selected = function ( val ,parentWindow ) {
	if ( val != undefined && val != null ) {
		if ( parentWindow ) {
			parentWindow.$( this ).val( val ).trigger( "chosen:updated" ).trigger( "change" );
		} else {
			$( this ).val( val ).trigger( "chosen:updated" );
		}
	}
	return $( this );
};
/**
 * endsWith 함수를 생성한다.(기존웹과동일)
 */
if ( !String.prototype.endsWith ) {
	String.prototype.endsWith = function ( searchString ,position ) {
		var subjectString = this.toString();
		if ( position === undefined || position > subjectString.length ) {
			position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf( searchString ,position );
		return lastIndex !== -1 && lastIndex === position;
	};
}
/**
 * removeTags 문자열에 포함된 태그를 제거한다.
 */
$.removeTags = function ( str ) {
	return str.replace( /\<\/(p|tr|li|div)\>/gi ,"\r\n" ).replace( /<[^>]*>/gi ,"" ).replace( /\r\n/gi ,"<br/>" );
}
/**
 * addOptions 함수를 생성한다.(기존웹과동일)
 */
$.fn.addOptions = function ( options ) {
	$( this ).find( "option" ).remove();
	if ( !options ) {
		alert( "parameter가 없습니다." );
		return false;
	}
	var placeholder = $( this ).data( "placeholder" );
	if ( placeholder ) {
		$( this ).append( $( "<option>" ,{
			value : "" ,
			text : placeholder
		} ) );
	}
	for ( var index = 0 ; index < options.dataList.length ; index++ ) {
		$( this ).append( $( "<option>" ,{
			value : options.dataList[ index ][ options.value ] ,
			text : options.dataList[ index ][ options.text ]
		} ) );
	}
	if ( options.selectedVal ) {
		$( this ).selected( options.selectedVal );
	} else {
		$( this ).trigger( "chosen:updated" );
	}
	if ( options.callback ) {
		eval( options.callback )();
	}
};
/**
 * replaceParam 함수를 생성한다.(기존웹과동일)
 */
$.replaceParam = function ( param ) {
	return param.replace( /\./g ,"\\." ).replace( /\[/g ,"\\[" ).replace( /\]/g ,"\\]" );
};
/**
 * bindParams 해당객체에 파라미터정보를 바인딩한다. $('<div>{name}</div>').bindParams({ "name":"김단국" }); <div>김단국</div>
 */
$.fn.bindParams = function ( params ) {
	var temp ,name;
	if ( !params ) params = {};
	this.template = $( this ).prop( 'outerHTML' );
	do {
		temp = this.template.match( /\{([0-9a-zA-Z]+)\}/ )
		if ( temp ) {
			name = temp[ 0 ].replace( /(\{|\})/g ,'' );
			this.template = this.template.replace( new RegExp( "\\{" + name + "\\}" ,"g" ) ,params[ name ] != null ? params[ name ] : "" );
		}
	} while ( temp );
	return $( this ).html( $( this.template ).html() );
};
/**
 * addRow 템플릿객체를 해당객체에 바인딩한다. $("
 * <ul>
 * </ul>
 * ").addRow('
 * <li>{name}
 * <li>',{ "name":"김단국" })
 * <ul>
 * <li>김단국</li>
 * </ul>
 */
$.fn.addRow = function ( template ,params ) {
	var temp ,name;
	if ( !params ) params = {};
	this.template = $( template ).prop( 'outerHTML' );
	do {
		temp = this.template.match( /\{([0-9a-zA-Z]+)\}/ )
		if ( temp ) {
			name = temp[ 0 ].replace( /(\{|\})/g ,'' );
			this.template = this.template.replace( new RegExp( "\\{" + name + "\\}" ,"g" ) ,params[ name ] != null ? params[ name ] : "" );
		}
	} while ( temp );
	var $object = $( this.template )
	$object.appendTo( this );
	return comm.bindEvent( $object );
};
/**
 * submit post방식으로 이동하기위해 사용된다.
 */
( function ( $ ) {
	$.submit = function ( url ,params ) {
		if ( !url ) {
			alert( "url은 필수값입니다." );
			return false;
		}
		var elements = "";
		$.each( params ,function ( key ,value ) {
			elements += "<input type='hidden' name='" + key + "' value='" + value + "'>";
		} );
		$( "<form method='post' action='" + url + "'>" + elements + "</form>" ).appendTo( "body" ).submit().remove();
	};
} )( jQuery );
/**
 * params 해당객체에서 파라미터 정보를 가져온다. $("<div><input name='name' value="김단국"/><input name='stuid' value="23100000"/></div>").params(); serialize() name=김단국&stuid=23100000 serializeArray() [name=name,value=김단국], => { name:"김단국" ,stuid:"23100000" }
 */
( function ( $ ) {
	$.fn.params = function () {
		var params = {};
		$.each( $( this ).find( "input,select,textarea" ).serializeArray() ,function ( index ,object ) {
			params[ object.name ] = object.value;
		} );
		return params;
	};
} )( jQuery );
/**
 * layout 모바일 상세보기(다이얼로그 레이아웃) dialogCloseChk,dialogClose,onpopstate => 브라우저 뒤로가기 버튼시 레이아웃닫기 체크
 */
( function ( $ ) {
	var dialogClose = function () {
		var params = location.href.match( /(.+)\#(.+)/ ,"$2" ) ? location.href.replace( /(.+)\#(.+)/ ,"$2" ) : "";
		$( ".ui-dialog .ui-dialog-content" ).each( function () {
			if ( params.indexOf( $( this ).attr( "id" ) ) == -1 ) {
				$( this ).attr( "closeCall" ,"true" ).dialog( "close" );
			}
		} );
	};
	window.onpopstate = function ( event ) {
		dialogClose();
	};
	$.fn.layout = function ( params ) {
		var scrollHeight = document.body.scrollTop;
		var removeYn = $( document ).find( $( this ) ).length <= 0;
		if ( $( this ).find( ".LAYOUT_CLOSE_BTN" ).length || $( this ).is( "#exportReportView" ) ) {
			$( this ).find( ".LAYOUT_CLOSE_BTN" ).click( function ( e ) {
				e.preventDefault();
				$( this ).closest( ".ui-dialog" ).find( ".ui-dialog-titlebar-close" ).click();
			} );
			params.buttons = [];
		}
		var dialogId = null;
		if ( !$( this ).attr( "id" ) ) {
			$( this ).attr( "id" ,"DIALOG_LAYOUT_" + new Date().getTime().toString() );
		} else if ( $( this ).attr( "id" ).indexOf( "DIALOG_LAYOUT_" ) == -1 ) {
			$( this ).attr( "id" ,"DIALOG_LAYOUT_" + $( this ).attr( "id" ) );
		}
		if ( location.href.indexOf( "&" + $( this ).attr( "id" ) ) == -1 && location.href.indexOf( "#" + $( this ).attr( "id" ) ) == -1 ) {
			location.href = location.href + ( location.href.indexOf( "#" ) == -1 ? "#" : "&" ) + $( this ).attr( "id" );
		}
		$( this ).show().dialog( $.extend( {
			"autoOpen" : true ,
			"modal" : true ,
			"position" : "top" ,
			"width" : $( window ).width() ,
			"height" : $( window ).height() ,
			"close" : function () {
				$( "body" ).removeClass( "body_pop" );
				if ( removeYn ) {
					$( this ).remove();
				}
				document.body.scrollTop = scrollHeight;
				if ( $( this ).attr( "closeCall" ) != "true" ) {
					history.back();
				}
			} ,
			"create" : function () {
				$( "body" ).addClass( "body_pop" );
				$( ".ui-dialog" ).css( "top" ,"0" );
				$( this ).find( "a" ).not( ".FILE_DOWNLOAD" ).each( function () {
					if ( $( this ).attr( "href" ).match( /^http(s)?\:\/\/(.+)/gi ) ) {
						$( this ).addClass( "NATEVE_OPEN" );
					}
				} );
				comm.bindEvent( $( this ) );
			} ,
			"dialogClass" : "syworksDialog" ,
			"draggable" : false
		} ,params ) );
	};
} )( jQuery );
/**
 * numberFormat 문자열을 3자리에 맞추어 콤마 예를들면 1000 => 1,000
 */
( function ( $ ) {
	$.fn.numberFormat = function () {
		var number_format = function ( vals ) {
			var input = String( vals );
			var reg = /(\-?\d+)(\d{3})($|\.\d+)/;
			if ( reg.test( input ) ) {
				return input.replace( reg ,function ( str ,p1 ,p2 ,p3 ) {
					return number_format( p1 ) + "," + p2 + "" + p3;
				} );
			} else {
				return input;
			}
		}
		$( this ).each( function () {
			if ( $( this ).is( "input" ) || $( this ).is( "textarea" ) ) {
				$( this ).val( number_format( $( this ).val() ) );
			} else {
				$( this ).text( number_format( $( this ).text() ) );
			}
		} );
	};
} )( jQuery );
/**
 * telFormat 전화번호 형태로 변환한다.
 */
( function ( $ ) {
	$.fn.telFormat = function () {
		$( this ).val( $( this ).val().replace( /^(02.{0}|^01.{1}|[0-9]{3})(\-)?([0-9]+)(\-)?([0-9]{4})/ ,"$1-$3-$5" ) );
	};
} )( jQuery );
