job [[ .jobName ]] {
	datacenters = ["dc1"]
	type = "service"
	update {
		stagger = "10s"
		max_parallel = 1
		min_healthy_time = "5m"
		 healthy_deadline = "10m"
		progress_deadline = "11m"
	}
	group "logroup" {
		count = 2
		restart {
			attempts = 2
			interval = "1m"
			delay = "10s"
			mode = "fail"
		}
		task "logger" {
			driver = "docker"
			config {
				image = "chentex/random-logger:latest"
			}
			resources {
				cpu = 500 # 500 MHz
				memory = 256 # 256MB
			}
		}
	}
}
