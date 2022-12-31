let time : any = null; 

export function debouce(fn: () => void){
   clearTimeout(time);
   
   return () => {
      time = setTimeout(fn, 3000)
   }
}
