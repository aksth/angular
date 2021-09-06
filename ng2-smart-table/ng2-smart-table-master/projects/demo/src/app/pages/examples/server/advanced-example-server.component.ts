import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerDataSource } from "ng2-smart-table";

@Component({
  selector: "advanced-example-server",
  template: `
    <ng2-smart-table
      [settings]="settings"
      [source]="source"
      (userRowSelect)="onUserSelect($event)"
    ></ng2-smart-table>
  `,
})
export class AdvancedExampleServerComponent {
  settings = {
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: "yourAction",
          title: '<a href="#">action 1</i>',
        },
        {
          name: "editAction",
          title: '<a href="#">action 2</i>',
        },
        {
          name: "deleteAction",
          title: '<a href="#">action 3</i>',
        },
      ],
    },
    columns: {
      id: {
        title: "ID",
      },
      albumId: {
        title: "Album",
      },
      title: {
        title: "Title",
      },
      url: {
        title: "Url",
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, {
      endPoint: "https://jsonplaceholder.typicode.com/photos",
    });
    /* this.source = new ServerDataSource(http, {
      endPoint: "https://jsonplaceholder.typicode.com/photos",
    }); */
    
  }

  onUserSelect() {
    console.log(event);
  }
}
