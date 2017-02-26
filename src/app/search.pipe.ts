import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Search'
})
export class SearchPipe implements PipeTransform {
    
  transform(patients: any, args: any): any {
    
    if (args === undefined || args == "") return patients;
    let res = [];
    for(let i =0;i<patients.length;i++){
      if(patients[i].first_name.toLowerCase().indexOf(args.toLowerCase()) >=0 || patients[i].last_name.toLowerCase().indexOf(args.toLowerCase()) >=0){
        res.push(patients[i])
      }else{
      }
    }

    return res;
  }

}
