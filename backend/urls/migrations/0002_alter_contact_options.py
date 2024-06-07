from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('urls', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='url',
            options={'ordering': ('-date_create',)},
        ),
    ]
