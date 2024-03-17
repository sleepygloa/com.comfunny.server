package com.comfunny.server.sys.paramaters;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public final class ParamsFactory {
	private static final Log LOG = LogFactory.getLog(ParamsFactory.class);

	public static final <T extends Params> Params createParams() {
		try {
			return new CommParams();
		} catch (Exception e) {
			if (LOG.isErrorEnabled()) {
				LOG.error("Exception", e);
			}
			e.printStackTrace();
		}
		return null;
	}
	public static final <T extends Params> Params createParams(T params) {
		if (params.getClass().equals(FileParams.class)) {
			try {
				return ((Params) params.getClass().newInstance());
			} catch (InstantiationException e) {
				if (LOG.isErrorEnabled()) {
					LOG.error("Exception", e);
				}
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				if (LOG.isErrorEnabled()) {
					LOG.error("Exception", e);
				}
				e.printStackTrace();
			}
		}else if (params.getClass().equals(NaviParams.class)) {
			try {
				return ((Params) params.getClass().newInstance());
			} catch (InstantiationException e) {
				if (LOG.isErrorEnabled()) {
					LOG.error("Exception", e);
				}
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				if (LOG.isErrorEnabled()) {
					LOG.error("Exception", e);
				}
				e.printStackTrace();
			}
		}else if (params.getClass().equals(LinkedParams.class)) {
			try {
				return ((Params) params.getClass().newInstance());
			} catch (InstantiationException e) {
				if (LOG.isErrorEnabled()) {
					LOG.error("Exception", e);
				}
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				if (LOG.isErrorEnabled()) {
					LOG.error("Exception", e);
				}
				e.printStackTrace();
			}
		} else {
			Params commParams = new CommParams();			
			if (params.getClass().equals(CommParams.class)) {
				return getCommParams((CommParams) commParams); 
			}
		}
		return null;
	}

	public static final <T extends Params >Params createOutParams(T params) {
		Params returnParmas = null;
		try {
			returnParmas = ((Params) params.getClass().newInstance());
			returnParmas.init();
		} catch (InstantiationException e) {
			if (LOG.isErrorEnabled()) {
				LOG.error("Exception", e);
			}
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			if (LOG.isErrorEnabled()) {
				LOG.error("Exception", e);
			}
			e.printStackTrace();
		}
		return returnParmas;
	}
	
	@Deprecated
	private static final CommParams getCommParams(Params params) {
		CommParams commParams = new CommParams();
//		 commParams.setLocale(Params.getLocale());
		return commParams;
	}
	public static final <T extends Params >Params convertParmas(Params p){
		Params newParams = null;
		if(p.isPageable()){
			LOG.debug("NaviParams Convert.");
			newParams =  new NaviParams(p);
		}else if(p.isFileable()){
			LOG.debug("FileParams Convert.");
			newParams = new FileParams(p);
		}else{
			newParams = p;
		}
		return newParams ;
	}
	public static final FileParams convertFileParmas(Params p){
		return new FileParams(p) ;
	}
}
