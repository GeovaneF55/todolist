import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filtro"
})
export class Filtro implements PipeTransform{
    transform(itens: any[], filtro: any): any{
        itens.sort((a, b) => a.data-b.data);
        if(filtro.projeto >= 0){
            return itens.filter(item => item.projeto == filtro.projeto);
        } else if(filtro.dias >= 0){
            let d = new Date((new Date()).getTime() + filtro.dias*24*60*60*1000);
            return itens.filter(item => item.data <= d);
        }else{
            return itens;
        }
    }
}