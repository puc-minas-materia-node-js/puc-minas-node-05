import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db/sql.lite',
            synchronize: true,
            autoLoadEntities: true
        }),
    ],
})
export class TypeOrmConfigModule {}
