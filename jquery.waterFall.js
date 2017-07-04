(function($){ 


        
    $.fn.extend({
        waterFall:function(){
            /*1.获取父元素,和子元素*/
            var parentBox = $(this); 
            var parentWidth = parentBox.width();
            var childItems = parentBox.children();

            //console.log(childItems);
            /*子元素宽*/
            var childWidth = childItems.width();
            //console.log(childWidth);

            var cloumn = 5;

            /*2.计算间隔*/
            var space = (parentWidth-childWidth*cloumn)  / (cloumn -1);
            //console.log(space)

            var heightArr = [];

            /*3.给所有的子元素定位*/
            childItems.each(function(index,element){
                    //console.log(index);
                    //console.log(element);

                    if(index<cloumn){
                        //第一行元素  索引值(0,1,2,3,4)
                        $(element).css({
                            top:0,
                            left:index * (childWidth + space)
                        });
                        /*把设置好的元素的高度存储到数组中*/
                        heightArr.push( $(element).height() );

                    } else {
                        /*其他行元素*/
                        //console.log(heightArr);

                        /*假定第一个是最小值*/
                        var minIndex = 0;
                        var minValue = heightArr[minIndex]

                        /*找出最小值和在高度数组中的索引*/
                        for(var i=0; i<heightArr.length; i++){
                            if(heightArr[i] < minValue){
                                minValue = heightArr[i];
                                minIndex = i;
                            }
                        }
                        /*设置元素的位置*/
                        $(element).css({
                            top:minValue + space,
                            left:minIndex *(childWidth + space)
                        });

                        // console.log(minIndex);
                        // console.log(minValue);
                        /*更新数组的高度*/
                        heightArr[minIndex] +=  $(element).height()+ space;
                    }
            })

            /*找出最高的列,把高度赋值给父元素*/
            var maxValue = 0;
            for(var i=0; i<heightArr.length; i++){
                if(heightArr[i] > maxValue){
                    maxValue = heightArr[i];
                }
            }
            parentBox.height(maxValue);

        }
    })


})(jQuery)
