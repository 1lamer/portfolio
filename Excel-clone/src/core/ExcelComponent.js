import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.emitter = options.emitter
		this.subscribe = options.subscribe || []
		this.store = options.store
		this.unsubscribers = []

		this.prepare()
	}

	// Настраиваем наш компонент до init
	prepare() {}

	// Возвращает шаблон комнонента
	toHTML() {
		return ''
	}

	// Уведовляем слушателей про событие event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args)
	}

	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}

	$dispatch(action) {
		this.store.dispatch(action)
	}

	// Сюда приходят изменения только по тем полям, на которые подписались
	storeChanged() {}

	isWatching(key) {
		return this.subscribe.includes(key)
	}

	// Инициализируем компонент 
	// Добавляем DOM слушателей
	init() {
		this.initDOMListeners()
	}

	// Удаляем компонент
	// Чистим слушатели
	destroy() {
		this.removeDOMListeners()
		this.unsubscribers.forEach(unsub => unsub())
	}
}