import { Component, OnInit, ViewChild } from '@angular/core';
import * as downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'organizational-chart';
  arrayOfColors: String[] = [];

  @ViewChild('organizational-chart') organizationalChart: any;
  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      styleClass: 'border-x-3 border-blue-400 text-black',
      data: {
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          styleClass: 'border-top-3 border-yellow-400 text-black',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO'
          },
          children: [
            {
              expanded: true,
              type: 'person',
              styleClass: 'border-top-3 border-yellow-400 text-black',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
                name: 'Raymond Doss',
                title: 'Sales'
              },
              children: [
                {
                  expanded: true,
                  type: 'person',
                  styleClass: 'border-top-3 border-yellow-400 text-black',
                  data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
                    name: 'Raymond Doss',
                    title: 'Sales'
                  }
                }
              ]
            },
            {
              expanded: true,
              type: 'person',
              styleClass: 'border-top-3 border-yellow-400 text-black',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
                name: 'Yin Gu',
                title: 'Marketing'
              }
            }
          ]
        },
        {
          expanded: true,
          type: 'person',
          styleClass: 'border-top-3 border-teal-400 text-black',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
            name: 'Stephen Shaw',
            title: 'CTO'
          },
          children: [
            {
              expanded: true,
              type: 'person',
              styleClass: 'border-top-3 border-teal-400 text-black',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
                name: 'Raymond Doss',
                title: 'Backend-Developer'
              }
            },
            {
              expanded: true,
              type: 'person',
              styleClass: 'border-top-3 border-teal-400 text-black',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png',
                name: 'Kanye',
                title: 'Frontend-Developer'
              }
            },
            {
              expanded: true,
              type: 'person',
              styleClass: 'border-top-3 border-teal-400 text-black',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
                name: 'Benjamin',
                title: 'Automation Tester'
              }
            }
          ]
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.loadColorsInArray();
    this.arrayOfColors.map(ele => {
      //console.log("Eleemnts is ", ele);
    })

    console.log("Whole data is", this.data);

    console.log(this.data.map(element => {
      console.log("First children is", element.children);
    }))
  }


  //Sets color on the header according to person's designation by the border color used
  //around the card.
  setBackground(node: any) {
    //console.log(node);
    let styleClass=node.styleClass;
    let bgColor = styleClass.split(' ');
    let bgColorFinal=`${bgColor[1]}`.replace('border','bg');
    bgColorFinal=bgColorFinal.replace('400','500');
    //console.log(bgColorFinal);
    if(node.data.title=="CEO"){
      return [bgColorFinal,'w-1.5rem', 'h-1rem', 'mb-1']
    }
    if(node.data.title=="CMO" || node.data.title=="CTO" ){
      return [bgColorFinal,'w-2rem', 'h-1rem', 'mb-1']
    }
    if(node.data.title !='CTO' && node.data.title !='CEO' && node.data.title !='CMO'){
      return [bgColorFinal,'w-1rem', 'h-1rem', 'mb-1']
    }
    return [bgColorFinal];
  }

  //Sets header color for only cards without any child, according to the border color used.
  setNoChild(node:any){
    console.log(node);
    let styleClass=node.styleClass;
    let bgColor = styleClass.split(' ');
    let bgColorFinal=`${bgColor[1]}`.replace('border','bg');
    bgColorFinal=bgColorFinal.replace('400','500');
    return [bgColorFinal,'w-1rem' ,'h-1rem', 'border-circle', 'mb-1'];
  }

  loadColorsInArray() {
    this.arrayOfColors.push('border-blue-400');
    this.arrayOfColors.push('border-teal-400');
    this.arrayOfColors.push('border-yellow-400');
    this.arrayOfColors.push('border-indigo-400');
    this.arrayOfColors.push('border-red-400');
    this.arrayOfColors.push('border-orange-400');
    this.arrayOfColors.push('border-purple-400');
  }

  handleCaptureClick = async () => {
    const htmlElement = document.getElementById('organizational-chart');
    if (htmlElement) {
      const canvas = await html2canvas(htmlElement, { allowTaint: true, useCORS: true });
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }
  };
}
