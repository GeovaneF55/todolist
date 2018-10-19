import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filtro"
})
export class Filtro implements PipeTransform{
    transform(itens: any[], filtro: any): any{
        if(filtro.projeto >= 0){
            return itens.filter(item => item.projeto == filtro.projeto);
        } else{
            return itens;
        }
    }
}