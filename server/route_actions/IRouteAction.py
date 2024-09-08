from abc import abstractmethod
from typing import Any, List


class IRouteAction():

	@property
	@abstractmethod
	def route_path(self) -> List[str]:
		raise NotImplementedError('Method "route_path" must be Implemented')

	@property
	@abstractmethod
	def route_method(self) -> List[str]:
		raise NotImplementedError('Method "route_method" must be Implemented')

	@property
	@abstractmethod
	def route_status_code(self) -> int:
		return 200

	@property
	@abstractmethod
	def response_model(self):
		return None

	@abstractmethod
	def action(self, **kwargs) -> Any:
		raise NotImplementedError('Method "action" must be Implemented')
