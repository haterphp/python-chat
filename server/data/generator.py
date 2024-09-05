import os
from shutil import rmtree
from json import load as load_json
from sys import argv


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

def enum_generator():
	json_filepath = os.path.join(os.path.dirname(os.path.abspath(argv[0])), "Enums.json")
	template_filepath = os.path.join(os.path.dirname(os.path.abspath(argv[0])), "bin/EnumClassTemplate.txt")
	dir_for_saving = "server/enums" 
	filepath_for_saving = os.path.join(dir_for_saving, "{0}.py")

	create_data_dir(dir_for_saving)
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

		content = template_file_content.format(class_name, variant_template.strip(), range_template)
		print(content)
		with open(filepath_for_saving.format(class_name), "w") as openfile:
			openfile.write(content)
			openfile.close() 


enum_generator()
# schema_generator()