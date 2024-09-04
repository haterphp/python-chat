import os
from shutil import rmtree
from json import load as load_json
from sys import argv

JSON_FILEPATH = os.path.join(os.path.dirname(os.path.abspath(argv[0])), "Schemas.json")
TEMPLATE_FILEPATH = os.path.join(os.path.dirname(os.path.abspath(argv[0])), "bin/SchemaClassTemplate.txt")
SCHEMAS_FOLDER_PATH = "server/schemas"
PATH_FOR_SAVING_SCHEMAS = os.path.join(SCHEMAS_FOLDER_PATH, "{0}.py")


def create_schemas_folder():
	if os.path.isdir(SCHEMAS_FOLDER_PATH):
		rmtree(SCHEMAS_FOLDER_PATH)
	os.mkdir(SCHEMAS_FOLDER_PATH)


def schema_generator():
	create_schemas_folder()

	with open(JSON_FILEPATH, 'r') as openfile:
		json_file_content = load_json(openfile)
		openfile.close() 

	with open(TEMPLATE_FILEPATH, 'r') as openfile:
		template_file = openfile.read()
		openfile.close() 

	for class_name, attrs in json_file_content.items():
		class_content = template_file.format(class_name, 'Greeting!')
		file_path = PATH_FOR_SAVING_SCHEMAS.format(class_name)
		
		with open(file_path, "w") as openfile:
			openfile.write(class_content)
			openfile.close() 

schema_generator()