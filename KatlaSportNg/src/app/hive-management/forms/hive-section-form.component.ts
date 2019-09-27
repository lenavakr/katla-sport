import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveListItem } from '../models/hive-list-item';
import { HiveSection } from '../models/hive-section';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {
  
  hiveSection = new HiveSection(0, "", "", 0, false, "");
  existed = false;
  storeHiveId: number;
  hives: HiveListItem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) {
        this.storeHiveId = p['storeHiveId'];
        this.hiveSection.storeHiveId = this.storeHiveId;   
        return;
      }

      this.storeHiveId = p['storeHiveId'];
      this.hiveSection.storeHiveId = this.storeHiveId;      
      this.hiveSectionService.getHiveSection(p['id']).subscribe(c => this.hiveSection = c);
      this.existed = true;
    });
  }
  
  navigateTo() {     
    if (this.storeHiveId === undefined) {
      this.router.navigate([`/hives`]);
    } else {
      this.router.navigate([`/hive/${this.storeHiveId}/sections`]);
    }
  }
  
  onCancel() {
    this.navigateTo();
  }

  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(p => this.navigateTo());
    } else {
      this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(p => this.navigateTo());
    }
  }
  
   onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe(c => this.hiveSection.isDeleted = true);
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(c => this.hiveSection.isDeleted = false);
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(c => this.navigateTo());
  }
}
