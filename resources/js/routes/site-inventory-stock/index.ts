import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/super-admin/site-inventory-stock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::index
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:14
 * @route '/super-admin/site-inventory-stock'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/super-admin/site-inventory-stock/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::create
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::store
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:49
 * @route '/super-admin/site-inventory-stock'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/super-admin/site-inventory-stock',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::store
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:49
 * @route '/super-admin/site-inventory-stock'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::store
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:49
 * @route '/super-admin/site-inventory-stock'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::store
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:49
 * @route '/super-admin/site-inventory-stock'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::store
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:49
 * @route '/super-admin/site-inventory-stock'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
export const show = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/super-admin/site-inventory-stock/{site_inventory_stock}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
show.url = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site_inventory_stock: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site_inventory_stock: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        site_inventory_stock: args.site_inventory_stock,
                }

    return show.definition.url
            .replace('{site_inventory_stock}', parsedArgs.site_inventory_stock.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
show.get = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
show.head = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
    const showForm = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
        showForm.get = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::show
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
        showForm.head = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
export const edit = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/super-admin/site-inventory-stock/{site_inventory_stock}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
edit.url = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site_inventory_stock: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site_inventory_stock: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        site_inventory_stock: args.site_inventory_stock,
                }

    return edit.definition.url
            .replace('{site_inventory_stock}', parsedArgs.site_inventory_stock.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
edit.get = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
edit.head = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
    const editForm = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
        editForm.get = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::edit
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:0
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}/edit'
 */
        editForm.head = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
export const update = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/super-admin/site-inventory-stock/{site_inventory_stock}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
update.url = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site_inventory_stock: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site_inventory_stock: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        site_inventory_stock: args.site_inventory_stock,
                }

    return update.definition.url
            .replace('{site_inventory_stock}', parsedArgs.site_inventory_stock.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
update.put = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
update.patch = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
    const updateForm = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
        updateForm.put = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::update
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:64
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
        updateForm.patch = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::destroy
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:79
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
export const destroy = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/super-admin/site-inventory-stock/{site_inventory_stock}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::destroy
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:79
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
destroy.url = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site_inventory_stock: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site_inventory_stock: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        site_inventory_stock: args.site_inventory_stock,
                }

    return destroy.definition.url
            .replace('{site_inventory_stock}', parsedArgs.site_inventory_stock.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::destroy
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:79
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
destroy.delete = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::destroy
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:79
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
    const destroyForm = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\SiteInventoryStockController::destroy
 * @see app/Http/Controllers/SuperAdmin/SiteInventoryStockController.php:79
 * @route '/super-admin/site-inventory-stock/{site_inventory_stock}'
 */
        destroyForm.delete = (args: { site_inventory_stock: string | number } | [site_inventory_stock: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const siteInventoryStock = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default siteInventoryStock