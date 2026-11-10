import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { CreateNavItemType } from '../types/CreateNavItemType';

/**
 *  CreateNavItemModel
 *  Constructs a navigation item based on CreateNavItemType
 */
function CreateNavItemModel(data?: PartialDeep<CreateNavItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default CreateNavItemModel;
