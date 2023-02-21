const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'http://vmetlbi.cadm.pjud:3009'
const url2 = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://vmetlbi.cadm.pjud:3009'
const report = {
  '/familia/terminosMaterias': [
    {
      key: 'gls_tribunal',
      label: 'Tribunal',
      sortable: true
    },
    {
      key: 'gls_tipo_causa',
      label: 'Tipo Causa',
      sortable: true
    },
    {
      key: 'gls_tipfallada',
      label: 'Tipo Fallo',
      sortable: true
    },
    {
      key: 'gls_homologacion',
      label: 'Agrupador',
      sortable: true
    },
    {
      key: 'gls_materia',
      label: 'Materia',
      sortable: true
    },
    {
      key: 'gls_estprocesal',
      label: 'Estado Procesal',
      sortable: true
    },
    {
      key: 'rit',
      label: 'RIT',
      sortable: true
    },
    {
      key: 'fecha_ingreso_causa',
      label: 'Fecha Ingreso',
      sortable: true
    },
    {
      key: 'fecha_firma',
      label: 'Fecha Termino',
      sortable: true
    },
    {
      key: 'juez',
      label: 'Juez',
      sortable: true
    }
  ],
  '/familia/ingresosMaterias': [
    {
      key: 'gls_tribunal',
      label: 'Tribunal',
      sortable: true
    },
    {
      key: 'gls_tipo_causa',
      label: 'Tipo Causa',
      sortable: true
    },
    {
      key: 'gls_ing_causa',
      label: 'Tipo Ingreso',
      sortable: true
    },
    {
      key: 'gls_estprocesal',
      label: 'Estado Procesal',
      sortable: true
    },
    {
      key: 'gls_homologacion',
      label: 'Agrupador',
      sortable: true
    },
    {
      key: 'gls_materia',
      label: 'Materia',
      sortable: true
    },
    {
      key: 'rit',
      label: 'RIT',
      sortable: true
    },
    {
      key: 'fec_ingreso',
      label: 'Fecha Ingreso',
      sortable: true
    }
  ],
  '/familia/terminosAudienciasDetalles': [
    {
      key: 'rit',
      label: 'Rit',
      sortable: true
    },
    {
      key: 'fecha_ingreso_causa',
      label: 'Fecha Ingreso',
      sortable: true
    },
    {
      key: 'fecha_firma',
      label: 'Fecha Firma',
      sortable: true
    },
    {
      key: 'tipo_causa',
      label: 'Tipo Cuasa',
      sortable: true
    },
    {
      key: 'gls_tiptramite',
      label: 'Tipo Tramite',
      sortable: true
    },
    {
      key: 'idf_tiposolicitud',
      label: 'Audiencia',
      sortable: true
    },
    {
      key: 'gls_tipfallada',
      label: 'Término',
      sortable: true
    },
    {
      key: 'juez',
      label: 'Juez',
      sortable: true
    }
  ],
  '/familia/resolucionesDetalles': [
    {
      key: 'idf_nombres',
      label: 'Nombre',
      sortable: true
    },
    {
      key: 'idf_paterno',
      label: 'Ap Paterno',
      sortable: true
    },
    {
      key: 'idf_materno',
      label: 'Ap Materno',
      sortable: true
    },
    {
      key: 'rit',
      label: 'Rit',
      sortable: true
    },
    {
      key: 'ruc',
      label: 'Ruc',
      sortable: true
    },
    {
      key: 'fecha_tramite',
      label: 'Fecha Tramite',
      sortable: true
    },
    {
      key: 'fecha_firma',
      label: 'Fecha Firma',
      sortable: true
    },
    {
      key: 'hora',
      label: 'Hora',
      sortable: true
    },
    {
      key: 'gls_tipo_causa',
      label: 'Tipo Causa',
      sortable: true
    },
    {
      key: 'procedimiento',
      label: 'Nomenclatura',
      sortable: true
    }
  ]
}
export {
  url,
  url2,
  report
}