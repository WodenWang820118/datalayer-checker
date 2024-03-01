import { HttpException, Injectable, Logger } from '@nestjs/common';
import { FileService } from '../../os/file/file.service';
import { FilePathService } from '../../os/path/file-path/file-path.service';

@Injectable()
export class WaiterSettingsService {
  constructor(
    private fileService: FileService,
    private filePathService: FilePathService
  ) {}

  async getProjectSettings(projectSlug: string) {
    const content = this.fileService.readJsonFile(
      await this.filePathService.getProjectSettingFilePath(projectSlug)
    );

    return {
      projectSlug,
      settings: content,
    };
  }

  async updateProjectSettings(projectSlug: string, partialSettings: any) {
    try {
      const filePath = await this.filePathService.getProjectSettingFilePath(
        projectSlug
      );

      const currentSettings = await this.fileService.readJsonFile(filePath);
      const localStorage = partialSettings.localStorage.map((item: any) => {
        return {
          key: item.key,
          value: JSON.parse(item.value),
        };
      });

      const cookie = partialSettings.cookie.map((item: any) => {
        return {
          key: item.key,
          value: JSON.parse(item.value),
        };
      });

      const updatedSettings = {
        ...currentSettings,
        application: {
          localStorage: {
            data: localStorage,
          },
          cookie: {
            data: cookie,
          },
        },
      };

      await this.fileService.writeJsonFile(filePath, updatedSettings);
      return updatedSettings;
    } catch (error) {
      Logger.error('Error updating settings', error);
      throw new HttpException('Error updating settings', 500);
    }
  }

  async createProjectSettings(projectSlug: string, settings: any) {
    const filePath = await this.filePathService.getProjectSettingFilePath(
      projectSlug
    );
    await this.fileService.writeJsonFile(filePath, settings);
    return settings;
  }
}
