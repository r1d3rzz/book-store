<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        Book::truncate();
        Category::truncate();

        $web = Category::factory()->create(['name'=>'Web Development','slug'=>'web']);
        $js = Category::factory()->create(['name'=>'Node','slug'=>'node']);

        $mgmg = User::factory()->create(['name'=>'Mg Mg','username'=>'mgmg']);
        $aungaung = User::factory()->create(['name'=>'Aung Aung','username'=>'aungaung']);

        Book::factory(2)->create(['author_id'=>$mgmg->id,'category_id'=>$web->id]);
        Book::factory(2)->create(['author_id'=>$aungaung->id,'category_id'=>$js->id]);
    }
}
