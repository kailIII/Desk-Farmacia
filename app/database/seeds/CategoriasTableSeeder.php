<?php
class CategoriasTableSeeder extends Seeder 
{
    public function run() 
    {
        $categorias = [
            "Antiparasitarios",
            "Antimicrobianos",
            "Antituberculosos y antileprosos",
            "Antimicóticos",
            "Antivirales",
            "Antisépticos urinarios y otros",
            "Cardiovascular",
            "Diuréticos",
            "Medicamentos que afectan la coagulación",
            "Analgésicos antirreumáticos",
            "Uricosurícos y antigotosos",
            "Analgésicos no narcóticos",
            "Analgésicos narcóticos y antagonistas",
            "Anestésicos generales",
            "Anestésicos locales",
            "Relajantes musculares",
            "Anticolinérgicos y antiespasmódicos",
            "Colinérgicos",
            "Antiasmáticos y broncodilatadores",
            "Antialérgicos, antihistamínicos y descongestionantes",
            "Medicamentos de uso gastrointestinal",
            "Medicamentos de uso en neurología y psiquiatría",
            "Medicamentos de uso en endocrinología",
            "Estrógenos, progestágenos y anovulatorios",
            "Hipolipemiantes",
            "Medicamentos de uso en oncología",
            "Micronutrientes",
            "Soluciones parenterales y electrolítos",
            "Biológicos",
            "Antídotos",
            "Oftalmológicos",
            "Dermatológicos",
            "Medicamentos de uso en ginecología y obstetricia",
            "Soporte nutricional",
            "Misceláneos"
        ];
        
        for($f=0; $f<count($categorias); $f++) {
            Categoria::create(array(
                "nombre" => $categorias[$f]
            ));
        }
    }
}