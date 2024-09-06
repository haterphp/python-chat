import os
from shutil import rmtree
from json import load as load_json
from sys import argv

CURRENT_DIR_PATH = os.path.dirname(os.path.abspath(argv[0]))
BIN_DIR_PATH = os.path.join(CURRENT_DIR_PATH, 'bin')
DATA_DIR_PATH = os.path.join(CURRENT_DIR_PATH, 'jsons')

DIR_FOR_SAVING_ENUMS = "server/enums"
DIR_FOR_SAVING_SCHEMAS = "server/schemas"

# Helpers region
def create_data_dir(dir_path):
	if os.path.isdir(dir_path):
		rmtree(dir_path)
	os.mkdir(dir_path)

def load_contents(json_file_path, template_file_path):
	with open(json_file_path, 'r') as openfile:
		json_file_content = load_json(openfile)
		openfile.close()

	with open(template_file_path, 'r') as openfile:
		template_file_content = openfile.read()
		openfile.close()

	return (json_file_content, template_file_content)
# endregion

def enums_generator():
	json_filepath = os.path.join(DATA_DIR_PATH, "Enums.json")
	template_filepath = os.path.join(BIN_DIR_PATH, "EnumClassTemplate.txt")
	filepath_for_saving = os.path.join(DIR_FOR_SAVING_ENUMS, "{0}.py")

	create_data_dir(DIR_FOR_SAVING_ENUMS)
	json_file_content, template_file_content = load_contents(json_filepath, template_filepath)

	for class_name, attrs in json_file_content.items():
		range_template = ""
		variant_template = ""

		for variant, value in attrs['variants'].items():
			formattedValue = "\"{}\"".format(value) if type(value) is str else value
			variant_template += "{0} = {1}".format(variant, formattedValue) + "\n\t"

		for range_name, values in attrs['ranges'].items():
			formattedValue = ", ".join(values)
			range_template += "{0} = [{1}]".format(range_name, formattedValue)

		content = template_file_content.format(class_name, variant_template.strip(), range_template.strip())
		with open(filepath_for_saving.format(class_name), "w") as openfile:
			openfile.write(content)
			openfile.close()

# Schemas generator region
def schema_attr_transform(value):
	types_dict = {
		"String": "str",
		"Integer": "int",
		"Float": "float",
		"Boolean": "bool",
	}

	return types_dict[value] if value in types_dict else None

def schemas_generator():
	json_filepath = os.path.join(DATA_DIR_PATH, "Schemas.json")
	template_filepath = os.path.join(BIN_DIR_PATH, "SchemaClassTemplate.txt")
	filepath_for_saving = os.path.join(DIR_FOR_SAVING_SCHEMAS, "{0}.py")

	create_data_dir(DIR_FOR_SAVING_SCHEMAS)
	json_file_content, template_file_content = load_contents(json_filepath, template_filepath)

	for class_name, attrs in json_file_content.items():
		attrs_template = ""

		for attr_name, attr_config in attrs['attrs'].items():
			attrs_template += "{0}: {1}".format(
				attr_name,
				schema_attr_transform(attr_config['type'])) + "\n\t"

		content = template_file_content.format(class_name, attrs_template.strip())
		with open(filepath_for_saving.format(class_name), "w") as openfile:
			openfile.write(content)
			openfile.close()
# endregion

enums_generator()
schemas_generator()