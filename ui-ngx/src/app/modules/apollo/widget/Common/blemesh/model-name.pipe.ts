// import { Pipe, PipeTransform } from '@angular/core';
// export const SigmeshModelList= [
//   {
//     modelid:'0000',
//     name:'Configuration Server'
//   },{
//     modelid:'0001',
//     name:'Configuration Client'
//   },{
//     modelid:'0002',
//     name:'Health Server'
//   },{
//     modelid:'0003',
//     name:'Health Client'
//   },{
//     modelid:'1000',
//     name:'Generic OnOff Server'
//   },{
//     modelid:'1001',
//     name:'Generic OnOff Client'
//   },{
//     modelid:'1002',
//     name:'Generic Level Server'
//   },{
//     modelid:'1003',
//     name:'Generic Level Client'
//   },{
//     modelid:'1004',
//     name:'Generic Default Transition Time Server'
//   },{
//     modelid:'1005',
//     name:'Generic Default Transition Time Client'
//   },{
//     modelid:'1006',
//     name:'Generic Power OnOff Server'
//   },{
//     modelid:'1007',
//     name:'Generic Power OnOff Time Setup Server'
//   },{
//     modelid:'1008',
//     name:'Generic Power OnOff Client'
//   },{
//     modelid:'1100',
//     name:'Sensor Server'
//   },{
//     modelid:'1101',
//     name:'Sensor Setup Server'
//   },{
//     modelid:'1102',
//     name:'Sensor Client'
//   },{
//     modelid:'1200',
//     name:'Time Server'
//   },{
//     modelid:'1201',
//     name:'Time Setup Server'
//   },{
//     modelid:'1202',
//     name:'Scene Client'
//   },{
//     modelid:'1203',
//     name:'Scene Server'
//   },{
//     modelid:'1204',
//     name:'Scene Setup Server'
//   },{
//     modelid:'1205',
//     name:'Scene Client'
//   },{
//     modelid:'1206',
//     name:'Scheduler Server'
//   },{
//     modelid:'1207',
//     name:'Scheduler Setup Server'
//   },{
//     modelid:'1208',
//     name:'Scheduler Client'
//   },{
//     modelid:'1300',
//     name:'Light Lightness Server'
//   },{
//     modelid:'1301',
//     name:'Light Lightness Setup Server'
//   },{
//     modelid:'1302',
//     name:'Light Lightness Client'
//   },{
//     modelid:'1306',
//     name:'Light CTL Temperature Server'
//   },{
//     modelid:'1307',
//     name:'Light HSL Server'
//   },{
//     modelid:'1308',
//     name:'Light HSL Setup Server'
//   },{
//     modelid:'1309',
//     name:'Light HSL Client'
//   },{
//     modelid:'130A',
//     name:'Light HSL Hue Server'
//   },{
//     modelid:'130B',
//     name:'Light HSL Saturation Server'
//   },{
//     modelid:'130C',
//     name:'Light xyL Server'
//   },{
//     modelid:'130D',
//     name:'Light xyL Setup Server'
//   },{
//     modelid:'130E',
//     name:'Light xyL Client'
//   },{
//     modelid:'130F',
//     name:'Light LC Server'
//   },{
//     modelid:'1310',
//     name:'Light LC Setup Server'
//   },{
//     modelid:'1311',
//     name:'Light LC Client'
//   },{
//     modelid:'80010001',
//     name:'Apollo Light Vendor'
//   },{
//     modelid:'80020002',
//     name:'Apollo Radar Vendor'
//   },
// ];
//
// @Pipe({
//   name: 'modelName'
// })
// export class ModelNamePipe implements PipeTransform {
//
//   transform(value: string): string {
//
//     const obj = SigmeshModelList.find(model =>{
//       if(model.modelid===value) {return true;}
//     });
//     return (obj)?obj.name:'Unknown model';
//   }
//
// }
