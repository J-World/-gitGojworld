var comm = {
	"init" : function () {
		/**
		 * 페이지 초기로드시 이벤트를 할당한다.
		 */
		( function () {
			comm.bindEvent( $( document ) );
		} )();
	} ,
	"bindEvent" : function ( target ) {
		/**
		 * 파라메터로 넘어오는 타겟에 대한 요소에 대한 이벤트를 설정하거나 제어한다.
		 */
		/**
		 * textarea형식에 대한 문자열을 태그형태로 변경한다.
		 */
		$( target ).find( ".TEXT_HTML" ).each( function () {
			$( this ).html( $( this ).html().replace( /\n/gi ,"<br/>\n" ).replace( /\t/gi ,"&emsp;" ).replace( /\s/gi ,"&nbsp;" ) );
		} );
		/**
		 * 문자열을 날짜형태로 변환한다.
		 */
		// $( target ).find( ".MASK_DATE" ).mask( "date" );
		/**
		 * 문자열을 자리수에 맞게 콤마를 추가한다.
		 */
		$( target ).find( ".MASK_CURRENCY" ).numberFormat();
		/* 작성자명 비밀처리 작성자=> 작*자 */
		$( ".SECRET_NM" ).each( function () {
			var params = $( this ).data( "params" );
			var wrirNm = $( this ).text();
			var firstNm = wrirNm.substr( 0 ,1 );
			while ( firstNm.length < wrirNm.length - 1 )
				firstNm = firstNm + escape( "*" );
			$( this ).text( firstNm + wrirNm.substr( wrirNm.length - 1 ,1 ) );
		} );
		/**
		 * 링크값이 없는경우는 이벤트를 취소한다.
		 */
		$( target ).find( "a[href='#']" ).click( function ( e ) {
			e.preventDefault();
		} );
		return $( target );
	}
};