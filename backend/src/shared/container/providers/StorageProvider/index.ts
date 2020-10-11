import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProviders';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
