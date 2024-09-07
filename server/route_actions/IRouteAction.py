from typing import List
from fastapi.responses import JSONResponse


class IRouteAction():

	def route_path(self) -> List[str]:
		raise NotImplementedError('Method "route_path" must be Implemented')

	def route_method(self) -> List[str]:
		raise NotImplementedError('Method "method" must be Implemented')

	def action(self, **kwargs) -> JSONResponse:
		raise NotImplementedError('Method "action" must be Implemented')

	def response_model(self):
		return None