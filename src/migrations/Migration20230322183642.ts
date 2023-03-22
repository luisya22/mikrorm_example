import { Migration } from '@mikro-orm/migrations';

export class Migration20230322183642 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default now(), `updated_at` datetime not null default now(), `first_name` varchar(255) not null, `last_name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `verification_code` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default now(), `updated_at` datetime not null default now(), `code` varchar(255) not null, `user_id` int unsigned not null, `expiration_date` datetime null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `verification_code` add index `verification_code_user_id_index`(`user_id`);');

    this.addSql('alter table `verification_code` add constraint `verification_code_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `verification_code` drop foreign key `verification_code_user_id_foreign`;');

    this.addSql('drop table if exists `user`;');

    this.addSql('drop table if exists `verification_code`;');
  }

}
