define( function(require, exports, module){

    function md2html( mdStr ){
        return markdown.toHTML( mdStr );
    }

    function addLanguageType( mdStr ){
        var htmlStr = md2html( mdStr );
        var tempArr = htmlStr.split('<pre><code>$');
        var codeCount = tempArr.length;
        if( codeCount > 1 ){
            for( var i=0; i+1 < codeCount; i++){
                var languageEnd = tempArr[i+1].indexOf('$');

                var languageType = tempArr[i+1].substr(0, languageEnd );
                tempArr[i] +='<pre class="line-numbers"><code class="language-' + languageType + '">';
                // 剪切字符串  因为有个换行符 所以要多减一个
                tempArr[i+1] = tempArr[i+1].substr( languageEnd+1, tempArr[i+1].length);
                tempArr[i+1] = tempArr[i+1].replace(/\n/,'');
                console.log( i );
            }
        }

        return tempArr.join('');
    }

    function itermConstructor( data ){
        var len = data.length;
        var htmlStr = '';
        if( len > 0 ){
            for(var n=0; n < len; n++ ){

                htmlStr += '<li class="iterm raw">' + consSingalIterm( data[n] ) + '</li>';
            }
        }
        else{
            htmlStr = '';
        }



        function consSingalIterm( data ){
            // var html = md2html( data.summery.text );
            var blog = new Blog( data.summery.text, 'html' );
            
            var extraBefore = '<div class="linetag"></div>';

            var extraAfter = '';

            // var top = '<div class="top">' + blog.title + '</div>';
            var top = '<div class="top"><h2 class="title" data-_id="' + data._id + '">' + data.title.replace(/#+/g, '') + '</div>';
            var middle = '<div class="middle">' + blog.content + '</div>';
            var bottom = '<div class="bottom">' + '</div>';

            return extraBefore + '<div class="bubble tri">' + top + middle + bottom + '</div>' + extraAfter;
        }

        return htmlStr;
    }


    var Blog = function( mdStr, type ){
        var thisClass = this;
        var titleReg;
        // var contentReg;
        if( mdStr ){
            if( type === 'html' ){
                titleReg = /<h\d>.+/;
                var blogStr = md2html( mdStr );
                var tempArr = blogStr.match( titleReg );
                thisClass.title = ( tempArr && tempArr.length >0 ) ? tempArr[0] : '<h2>无题</h2>';
                thisClass.content = blogStr.substr( thisClass.title.length, blogStr.length );

                thisClass.content = thisClass.content.trim();
            }
            else if( type === 'md' || !type ){
                titleReg = /#+.+\n+/;

                var tempArr = mdStr.match( titleReg );
                thisClass.title = ( tempArr && tempArr.length >0 )? tempArr[0] : '##无题';
                thisClass.content = mdStr.substr( thisClass.title.length, mdStr.length );

                thisClass.title = thisClass.title.replace(/\n/g, '');
            }
        }
        else{
            thisClass.title = '';
            thisClass.content = '';
        }

        
        return this;
    };




    exports.addLanguageType = addLanguageType;
    exports.md2html = md2html;
    exports.Blog = Blog;

    exports.itermConstructor = itermConstructor;
});