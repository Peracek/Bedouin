job [[ .jobName ]] {
	datacenters = ["dc1"]
	type = "service"
	update {
		stagger = "10s"
		max_parallel = 1
		canary           = 1
		min_healthy_time = "5m"
		 healthy_deadline = "10m"
		progress_deadline = "11m"
	}
	group "cache" {
		count = 2
		restart {
			attempts = 2
			interval = "1m"
			delay = "10s"
			mode = "fail"
		}
		task "redis" {
			driver = "docker"
			config {
				image = "redis:latest"
				port_map {
					db = 6379
				}
			}
			# 4 consul
			service {
				name = "${TASKGROUP}-redis"
				tags = ["global", "cache"]
				port = "db"
				check {
					name = "alive"
					type = "tcp"
					interval = "10s"
					timeout = "2s"
				}
			}
			resources {
				cpu = 500 # 500 MHz
				memory = 256 # 256MB
				network {
					mbits = 10
					port "db" {
					}
				}
			}
		}
	}
	group "cache2" {
		count = 3
		restart {
			attempts = 2
			interval = "1m"
			delay = "10s"
			mode = "fail"
		}
		task "redis" {
			driver = "docker"
			config {
				image = "redis:latest"
				port_map {
					db = 6379
				}
			}
			# 4 consul
			service {
				name = "${TASKGROUP}-redis"
				tags = ["global", "cache"]
				port = "db"
				check {
					name = "alive"
					type = "tcp"
					interval = "10s"
					timeout = "2s"
				}
			}
			resources {
				cpu = 500 # 500 MHz
				memory = 256 # 256MB
				network {
					mbits = 10
					port "db" {
					}
				}
			}
		}
	}
}
