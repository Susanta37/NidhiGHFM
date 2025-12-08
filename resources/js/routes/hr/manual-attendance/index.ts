import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/manual-attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::index
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:18
 * @route '/hr/manual-attendance'
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
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/hr/manual-attendance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::create
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/create'
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
* @see \App\Http\Controllers\HR\ManualAttendanceController::store
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:50
 * @route '/hr/manual-attendance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hr/manual-attendance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::store
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:50
 * @route '/hr/manual-attendance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::store
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:50
 * @route '/hr/manual-attendance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::store
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:50
 * @route '/hr/manual-attendance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::store
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:50
 * @route '/hr/manual-attendance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
export const show = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hr/manual-attendance/{manual_attendance}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
show.url = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { manual_attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    manual_attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        manual_attendance: args.manual_attendance,
                }

    return show.definition.url
            .replace('{manual_attendance}', parsedArgs.manual_attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
show.get = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
show.head = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
    const showForm = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
        showForm.get = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::show
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
        showForm.head = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
export const edit = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/hr/manual-attendance/{manual_attendance}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
edit.url = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { manual_attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    manual_attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        manual_attendance: args.manual_attendance,
                }

    return edit.definition.url
            .replace('{manual_attendance}', parsedArgs.manual_attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
edit.get = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
edit.head = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
    const editForm = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
        editForm.get = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::edit
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:0
 * @route '/hr/manual-attendance/{manual_attendance}/edit'
 */
        editForm.head = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
export const update = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/hr/manual-attendance/{manual_attendance}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
update.url = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { manual_attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    manual_attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        manual_attendance: args.manual_attendance,
                }

    return update.definition.url
            .replace('{manual_attendance}', parsedArgs.manual_attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
update.put = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
update.patch = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
    const updateForm = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
        updateForm.put = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::update
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:85
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
        updateForm.patch = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HR\ManualAttendanceController::destroy
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:124
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
export const destroy = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/hr/manual-attendance/{manual_attendance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::destroy
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:124
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
destroy.url = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { manual_attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    manual_attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        manual_attendance: args.manual_attendance,
                }

    return destroy.definition.url
            .replace('{manual_attendance}', parsedArgs.manual_attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\ManualAttendanceController::destroy
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:124
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
destroy.delete = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::destroy
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:124
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
    const destroyForm = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HR\ManualAttendanceController::destroy
 * @see app/Http/Controllers/HR/ManualAttendanceController.php:124
 * @route '/hr/manual-attendance/{manual_attendance}'
 */
        destroyForm.delete = (args: { manual_attendance: string | number } | [manual_attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const manualAttendance = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default manualAttendance