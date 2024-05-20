import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import * as unzipper from 'unzipper';
import archiver from 'archiver';

@Injectable()
export class ProjectIoService {
  async compressProject(
    projectFolderPath: string,
    outputPath: string
  ): Promise<void> {
    try {
      Logger.log(
        `Compressing project at ${projectFolderPath} to ${outputPath}`
      );
      const output = createWriteStream(outputPath);
      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      archive.on('error', function (err) {
        Logger.log(err);
        throw new HttpException(
          'Failed to compress project',
          HttpStatus.BAD_REQUEST
        );
      });

      archive.pipe(output);
      archive.directory(projectFolderPath, false);
      await archive.finalize();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      Logger.error(error.message);
      throw new HttpException(
        'Failed to compress project',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async unzipProject(
    projectSlug: string,
    zipFilePath: string,
    outputFolderPath: string
  ): Promise<void> {
    try {
      const outputPath = `${outputFolderPath}/${projectSlug}`;
      const stream = createReadStream(zipFilePath).pipe(
        unzipper.Extract({ path: outputPath })
      );

      return new Promise((resolve, reject) => {
        stream.on('error', (error) => {
          Logger.error(error.message);
          reject(
            new HttpException(
              'Failed to unzip project',
              HttpStatus.INTERNAL_SERVER_ERROR
            )
          );
        });

        stream.on('close', () => {
          resolve();
        });
      });
    } catch (error) {
      Logger.error(error.message);
      throw new HttpException(
        'Failed to unzip project',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
