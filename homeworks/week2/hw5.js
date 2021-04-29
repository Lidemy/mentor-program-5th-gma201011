function join(arr, str) {
    if (arr.length === 0) { 
       return ''
     }
     
    var result = arr[0]
    for(let i = 1 ; i < arr.length; i++){
      result += str + arr[i]
     }
    return result
   }


function repeat(str, number){
    var result = ''
    for(let i = 0; i < number; i++){
      result += str
    }
    return result
   }